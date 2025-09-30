import TagManager from '@sooro-io/react-gtm-module'

// Take care not to rename the event keys, because they are mapped to events in Google Tag Manager.
type TagManagerEventType =
    // Event pushed to data layer when user changes theme
    | { event: 'theme changed'; theme: string; previousTheme?: string }
    // Event pushed to data layer when user requests song recommendation
    | { event: 'song recommendation'; songName?: string; artistName?: string }


export function TagManagerEvent(event: TagManagerEventType): void {
    if (typeof window !== 'undefined') {
        TagManager.dataLayer({
            dataLayer: {
                ...event,
            },
        })
    }
}
