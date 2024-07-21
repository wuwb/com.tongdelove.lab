import { SetMetadata } from '@nestjs/common'
import { PUBLIC_KEY_METADATA } from '../constants/decorator.constant'

export const Public = () => SetMetadata(PUBLIC_KEY_METADATA, true)
