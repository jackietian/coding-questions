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

const featureFlagsCache = new Map();

const updateCache = (newFeatureFlags) => {
    Object.keys(newFeatureFlags).forEach(featureName => {
        featureFlagsCache.set(featureName, newFeatureFlags[featureName])
    })
}

const getFeatureState = async (featureName) => {
    if (featureFlagsCache.size > 0) {
        if (featureFlagsCache.get(featureName) === undefined) {
            return false;
        }
        return featureFlagsCache.get(featureName);
    }

    const featureFlags = await fetchAllFeatures()
    updateCache(featureFlags)

    return featureFlags[featureName]
}


const updateFeatureFlags = (featureName, value) => {
    latestFeatureFlags = {
        ...latestFeatureFlags,
        [featureName]: value
    }
}

const main = async () => {
    console.log(`extended-summary flag is ${await getFeatureState('extended-summary')}`)
    console.log(`extended-summary flag is ${await getFeatureState('extended-summary')}`)
    updateFeatureFlags('extended-summary', false)
    console.log(`extended-summary flag is ${await getFeatureState('extended-summary')}`) // expected to false

    console.log(`favorite-feature flag is ${await getFeatureState('favorite-feature')}`)
    console.log(`favorite-feature flag is ${await getFeatureState('favorite-feature')}`)
}

main()


// changeFeatureFlags();
// getFeatureState('extended-summary').then(res => {
//     console.log(`extended-summary feature flag is ${res}`) // expected to false
// })


// // src/feature-x/summary.js
// getFeatureState("extended-summary")
//     .then(function (isEnabled) {
//         if (isEnabled) {
//             showExtendedSummary();
//         } else {
//             showBriefSummary();
//         }
//     });

// // src/feature-y/feedback-dialog.js
// getFeatureState("feedback-dialog")
//     .then(function (isEnabled) {
//         if (isEnabled) {
//             makeFeedbackButtonVisible();
//         }
//     });