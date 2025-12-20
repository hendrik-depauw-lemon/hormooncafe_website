export function useTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
