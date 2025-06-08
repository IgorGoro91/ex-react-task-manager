import {createPortal} from 'react-dom';

export default function Modal({ title, content, show, onClose, onConfirm,  confirmText = "Conferma" }) {
    
    if (!show) return null;

    return createPortal(
        
        <div className="modal-overlay" >
            <div className="modal-content">
                <h2>{title}</h2>
                {content}
                <button onClick={onClose}>Annulla</button>
                <button onClick={onConfirm}>{confirmText}</button>
            </div>
        </div>,
        document.body

    )
   

}
