//@flow
import type { OptionsItems } from 'src/reducers/options'

export type SHOW_OPTIONS = {
    type: 'SHOW_OPTIONS',
}

export type CLOSE_OPTIONS = {
    type: 'CLOSE_OPTIONS',
}

export type READ_OPTIONS = {
    type: 'READ_OPTIONS',
}
export type SAVE_OPTIONS = {
    type: 'SAVE_OPTIONS',
    options: OptionsItems
}

export type OptionsAction = SHOW_OPTIONS | CLOSE_OPTIONS | READ_OPTIONS | SAVE_OPTIONS;

export const showOptions = () => (dispatch: any) => {

    let action: OptionsAction = {
        type: 'SHOW_OPTIONS'
    };
    dispatch(action);

}

export const closeOptions = () => (dispatch: any) => {

    let action: OptionsAction = {
        type: 'CLOSE_OPTIONS'
    };
    dispatch(action);

}

export const readOptions = () => (dispatch: any) => {

    let action: OptionsAction = {
        type: 'READ_OPTIONS'
    };
    dispatch(action);

}

export const saveOptions = (options: OptionsItems) => (dispatch: any) => {

    let action: OptionsAction = {
        type: 'SAVE_OPTIONS',
        options
    };
    dispatch(action);

}
