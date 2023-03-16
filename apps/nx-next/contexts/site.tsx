import React from 'react'
import { object } from 'zod'

interface HeadInterface {
    title: string
}

const siteState = {
    head: {
        title: ''
    } as HeadInterface
}

type ActionType =
    | { type: 'clean'; payload: object }
    | { type: 'head'; payload: HeadInterface }

interface SiteInterface {
    site: typeof siteState
    siteDispatch: React.Dispatch<ActionType>
}

const SiteContext = React.createContext<SiteInterface>({
    site: siteState,
    siteDispatch: () => object
})

const reducer = (state: typeof siteState, action: ActionType) => {
    const { type: actionType, payload } = action
    switch (actionType) {
        case 'clean': {
            return {
                ...state
            }
        }
        default: {
            return {
                ...state,
                [actionType]: payload
            }
        }
    }
}

interface Props {
    children: React.ReactElement | undefined
}

export const SiteProvider: React.FC<Props> = ({ children }) => {
    const callbackRef = React.useRef((site: typeof siteState) => object)
    const [site, siteDispatch] = React.useReducer(reducer, siteState)
    /*
    const customDispatch = (action: ActionType, callback?: Callback) => {
        if (typeof callback === 'function') callbackRef.current = callback
        storyDispatch(action)
    }
    */
    React.useEffect(() => {
        callbackRef.current && callbackRef.current(site)
    }, [site])
    return (
        <SiteContext.Provider value={{ site, siteDispatch }}>
            {children}
        </SiteContext.Provider>
    )
}

export const useSite = () => React.useContext(SiteContext)
