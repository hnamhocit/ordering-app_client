import {
	ModalBody,
	Modal as ModalContainer,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { FC, memo, ReactNode } from 'react'

interface ModalProps {
	trigger: ReactNode
	header: ReactNode
	triggerClassName?: string
	children: ReactNode
}

const Modal: FC<ModalProps> = ({
	trigger,
	triggerClassName,
	header,
	children,
}) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<>
			<button type='button' className={triggerClassName} onClick={onOpen}>
				{trigger}
			</button>

			<ModalContainer isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader className='text-foreground uppercase'>
						{header}
					</ModalHeader>
					<ModalBody>{children}</ModalBody>
				</ModalContent>
			</ModalContainer>
		</>
	)
}

export default memo(Modal)
