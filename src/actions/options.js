//@flow
import type { OptionsItems } from 'src/reducers/options'

export type READ_OPTIONS = {
    type: 'READ_OPTIONS',
}
export type SAVE_OPTIONS = {
    type: 'SAVE_OPTIONS',
    options: OptionsItems
}

export type OptionsAction = READ_OPTIONS | SAVE_OPTIONS;

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
