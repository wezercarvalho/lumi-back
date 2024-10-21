export interface SimpleMessage {
    message: string
    typeMessage: 'success' | 'warning' | 'error'
}

export interface BaseResponseProps extends SimpleMessage {
    success: boolean
    statusCode: number
    response?: unknown
    extraMessages?: SimpleMessage[]
}
