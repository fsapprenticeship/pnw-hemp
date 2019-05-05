export const CHANGE_TAB = 'CHANGE_TAB'

export function changeTab( tabId ) {
  return { type: CHANGE_TAB, activeTab: tabId }
}