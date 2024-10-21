import { BaseResponseProps, SimpleMessage } from 'types/baseResponse'

export class BaseResponse {
    constructor(props: BaseResponseProps) {
        this.success = props.success
        this.statusCode = props.statusCode
        this.timestamp = new Date().toISOString()
        this.message = props.message
        this.typeMessage = props.typeMessage
        this.response = props.response
        this.extraMessages = props.extraMessages
    }

    /**
     * Determina se executou com sucesso
     */
    success: boolean

    /**
     * Código do status
     */
    statusCode: number

    /**
     * Horário da resposta
     */
    timestamp: string

    /**
     * Mensagem
     */
    message?: string

    /**
     * Tipo da mensagem
     */
    typeMessage?: 'success' | 'warning' | 'error'

    /**
     * Dados da resposta
     */
    response?: unknown

    /**
     * Mensagens adicionais
     */
    extraMessages?: SimpleMessage[]
}
