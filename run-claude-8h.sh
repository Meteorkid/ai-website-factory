#!/usr/bin/env bash
# AI 官网工场 - 8小时自动迭代脚本
# 使用前请确保：
# 1. 已安装 Claude Code CLI
# 2. 已登录 Claude Code
# 3. 在项目目录运行

END_TIME=$((SECONDS + 8 * 60 * 60))
ROUND=1
LOG_FILE="claude-iterations.log"

echo "=========================================="
echo "AI 官网工场 - 8小时自动迭代启动"
echo "开始时间: $(date)"
echo "预计结束: $(date -v+8H 2>/dev/null || date)"
echo "日志文件: $LOG_FILE"
echo "=========================================="

while [ $SECONDS -lt $END_TIME ]; do
  echo ""
  echo "=============================="
  echo "Claude Code 自动迭代第 $ROUND 轮"
  echo "时间: $(date)"
  echo "=============================="

  START_ROUND=$SECONDS

  # 运行 Claude，即使失败也继续下一轮
  claude -p \
    --continue \
    --max-turns 15 \
    --dangerously-skip-permissions \
    "继续开发 AI 官网工场项目。
请严格按照以下顺序执行：
1. 读取 TASKS.md 和 CHANGELOG.md。
2. 查看 git status。
3. 从 TASKS.md 中选择优先级最高的一项未完成任务。
4. 只完成这一项任务，不要大范围重写。
5. 修改代码后运行 pnpm lint 和 pnpm build。
6. 修复检查中发现的问题。
7. 更新 TASKS.md，把已完成任务标记为完成。
8. 更新 CHANGELOG.md，记录本轮修改。
重要限制：
- 不要删除用户文件。
- 不要修改 .env、密钥。
- 不要执行 rm -rf、sudo。
- 不要把中文引号写入 TS/JS 文件。" 2>&1 | tee -a "$LOG_FILE" || true

  END_ROUND=$SECONDS
  DURATION=$((END_ROUND - START_ROUND))

  echo "" | tee -a "$LOG_FILE"
  echo "第 $ROUND 轮结束 | 耗时: ${DURATION}秒 | $(date)" | tee -a "$LOG_FILE"

  # Git 自动提交
  git add . 2>/dev/null || true
  git commit -m "auto: iteration $ROUND" --allow-empty 2>/dev/null || true

  ROUND=$((ROUND + 1))

  # 等待 30 秒再开始下一轮，避免 API 限流
  sleep 30
done

echo ""
echo "=========================================="
echo "8 小时自动运行结束"
echo "总轮次: $((ROUND - 1))"
echo "结束时间: $(date)"
echo "=========================================="
