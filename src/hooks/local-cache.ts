export const useLocalCache = <T>(key: string, defaultValue: T) => {
  const sessionStorageValue = JSON.parse(sessionStorage.getItem(key) || '{}')[key] ?? defaultValue
  const state = reactive({ value: sessionStorageValue })

  watchEffect(() => {
    const newValue = { [key]: state.value }
    sessionStorage.setItem(key, JSON.stringify(newValue))
  })

  return toRef(state, 'value')
}