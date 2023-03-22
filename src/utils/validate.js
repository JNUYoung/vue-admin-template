// 判断path是否为绝对url,若是则返回true
export function isAbsolutePath(path) {
  return /^(https?|tel|mailto|ws)/.test(path)
}