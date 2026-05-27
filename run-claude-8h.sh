#!/usr/bin/env bash
set -e

# AI 官网工场 - 8小时自动迭代脚本
# 使用前请确保：
# 1. 已安装 Claude Code CLI
# 2. 已登录 Claude Code
# 3. 在项目根目录运行

END_TIME=$((SECONDS + 8 * 60 * 60))
ROUND=1
LOG_FILE="claude-iterations.log"

echo "=========================================="
echo "AI 官网工场 - 8小时自动迭代启动"
echo "开始时间: $(date)"
echo "预计结束: $(date -d '+8 hours' 2>/dev/null || date -v+8H)"
echo "日志文件: $LOG_FILE"
echo "=========================================="

while [ $SECONDS -lt $END_TIME ]; do
  echo ""
  echo "=============================="
  echo "Claude Code 自动迭代第 $ROUND 轮"
  echo "时间: $(date)"
  echo "=============================="

  # 记录开始时间
  START_ROUND=$SECONDS

  claude -p \
    --continue \
    --max-turns 20 \
    --dangerously-skip-permissions \
    --verbose \
    --output-format stream-json \
    "继续开发 AI 官网工场项目。
请严格按照以下顺序执行：
1. 读取 README.md、CLAUDE.md、TASKS.md、CHANGELOG.md、package.json。
2. 查看当前项目结构和 git status。
3. 从 TASKS.md 中选择优先级最高的一项未完成任务。
4. 只完成这一项任务，不要大范围重写项目。
5. 修改代码后运行：
   - pnpm install，只有依赖缺失时才运行
   - pnpm lint
   - pnpm typecheck
   - pnpm build
6. 修复检查中发现的问题。
7. 更新 TASKS.md，把已完成任务标记为完成，并添加下一步任务。
8. 更新 CHANGELOG.md，记录本轮修改。
9. 输出本轮总结、检查结果、下一轮建议。
重要限制：
- 不要删除用户文件。
- 不要修改 .env、密钥、凭据、SSH 配置、系统目录。
- 不要执行 rm -rf、sudo、chmod -R 777、curl | bash 这类高风险命令。
- 不要把真实上市公司数据写成事实，除非项目内已有来源。
- 不要引入付费服务或需要登录的 API。
- 每轮保持小步迭代，避免一次性生成超大代码。
- 不要把中文引号（""）写入 TypeScript/JavaScript 文件。" 2>&1 | tee -a "$LOG_FILE"

  # 记录本轮耗时
  END_ROUND=$SECONDS
  DURATION=$((END_ROUND - START_ROUND))

  echo "" | tee -a "$LOG_FILE"
  echo "第 $ROUND 轮结束 | 耗时: ${DURATION}秒 | $(date)" | tee -a "$LOG_FILE"

  # Git 自动提交
  git add . 2>/dev/null || true
  git commit -m "auto: claude iteration $ROUND" --allow-empty 2>/dev/null || true

  ROUND=$((ROUND + 1))
  sleep 10
done

echo ""
echo "=========================================="
echo "8 小时自动运行结束"
echo "总轮次: $((ROUND - 1))"
echo "结束时间: $(date)"
echo "=========================================="
