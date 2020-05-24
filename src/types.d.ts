export interface InputValues {
    value: string
}

export interface CalenderState {
    currentDay: number
    challengeName: string
    challenges: Array<string>
}

export interface HomeState {
    favoriteName: string
}

export interface EditState {
    favoriteName: string
    calenderState?: CalenderState
}

interface CalenderItemCallback {
    (day: number): void;
}

export interface CalenderProps {
    editable: Boolean
    currentDay: number
    challengeName: string
    challenges: Array<string>
    onClickCalenderItem?: CalenderItemCallback
    onClickDeleteButton?: CalenderItemCallback
}