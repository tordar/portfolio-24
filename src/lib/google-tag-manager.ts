'use client'

import { useEffect } from 'react'
import TagManager from '@sooro-io/react-gtm-module'

export default function GoogleTagManager() {
    useEffect(() => {
        const gtmId = 'GTM-K3P4J2FL'

        /**
         * Important:
         * - All values should be strings and not numbers or other objects.
         * - If a variable has no value, omit the key or set it to undefined, don't use empty strings.
         */
        const tagManagerArgs = {
            gtmId,
        }

        TagManager.initialize(tagManagerArgs)
    }, [])

    return null
}
