const useLocalStorage = () => {
    const set = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }

    const get = (key) => {
        const stringifiedValue = localStorage.getItem(key)

        return JSON.parse(stringifiedValue)
    }

    const clear = (key) => {
        localStorage.removeItem(key)
    }

    return {
        set,
        get,
        clear
    }
}

export default useLocalStorage
