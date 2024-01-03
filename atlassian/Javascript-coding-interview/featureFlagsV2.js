let latestFeatureFlags = {
    "extended-summary": true,
    "feedback-dialog": false
};

// returns the state of *all* features for current user
function fetchAllFeatures() {
    // in reality, this would have been a `fetch` call:
    // `fetch("/api/features/all")`
    console.log('start fetching')
    return new Promise(resolve => {
        setTimeout(resolve, 100, latestFeatureFlags);
    });
}

let cache = {}

const getFeatureState = async (feature) => {
    if (Object.keys(cache).length === 0) {
        await loadAllFeaturesToCache()
    }

    return getFeatureFromCache(feature)
}

const getFeatureFromCache = (feature) => {
    if (!Object.keys(cache).includes(feature)) {
        return false
    }

    return cache[feature]
}

const loadAllFeaturesToCache = async () => {
    const AllFeatureFlags = await fetchAllFeatures()
    cache = AllFeatureFlags
}

const main = async () => {
    const result = await getFeatureState('extended-summary')
    console.log(`extended-summary feature is Enabled? ${result}`)

    const result1 = await getFeatureState('a')
    console.log(`a feature is Enabled? ${result1}`)
}

main()