import type { HomeworkOutputLine } from '../../types/progress';

function formatOutputValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'undefined') return 'undefined';

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function runUserJavaScript(code: string): HomeworkOutputLine[] {
  const lines: HomeworkOutputLine[] = [];

  const pushLine = (type: HomeworkOutputLine['type'], values: unknown[]) => {
    lines.push({
      type,
      text: values.map(formatOutputValue).join(' '),
    });
  };

  const sandboxConsole = {
    log: (...args: unknown[]) => pushLine('log', args),
    info: (...args: unknown[]) => pushLine('info', args),
    warn: (...args: unknown[]) => pushLine('info', ['⚠️', ...args]),
    error: (...args: unknown[]) => pushLine('error', args),
  };

  try {
    const runner = new Function('console', `'use strict';\n${code}`);
    runner(sandboxConsole);

    if (lines.length === 0) {
      lines.push({
        type: 'info',
        text: 'تم التشغيل بنجاح، لكن لا يوجد console.log لعرض نتيجة.',
      });
    }
  } catch (error) {
    lines.push({
      type: 'error',
      text:
        error instanceof Error
          ? error.message
          : 'حدث خطأ غير متوقع أثناء التشغيل.',
    });
  }

  return lines;
}
