//@flow
export type Location = {
    search: string, 
    hash: string    
}

export type DefaultProps = {
    location: Location,
    history: any,
    dispatch: any   
}