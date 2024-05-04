export function getFerdiumVersion(
  currentLocation: string,
  ferdiumVersion: string,
): string {
  const matches = currentLocation.match(/version=([^&]*)/);
  if (matches !== null) {
    return `v${matches[1]}`;
  }
  return `v${ferdiumVersion}`;
}

export function updateVersionParse(updateVersion: string): string {
  return updateVersion === '' ? '' : `?version=${updateVersion}`;
}

export function onAuthGoToReleaseNotes(
  currentLocation: string,
  updateVersionParsed: string = '',
): string {
  return currentLocation.includes('#/auth')
    ? `#/auth/releasenotes${updateVersionParsed}`
    : `#/releasenotes${updateVersionParsed}`;
}

export async function getUpdateInfoFromGH(): Promise<string> {
  try {
    return `
- 优化CPU占用
- 搞了一下文件大小 
- 升级各种库到最新版本
- 可能导致LINE无法使用
`;
  } catch {
    return '###  Nothing';
  }
}
