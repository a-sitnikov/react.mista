//@flow
export type Location = {
    search: string, 
    hash: string    
}

export type DefaultProps = {
    location: Location,
    history: Array<any>,
    dispatch: any,
    children?: Array<any>
}