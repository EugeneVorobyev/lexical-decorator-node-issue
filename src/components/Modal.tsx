import classnames from "classnames";
import { createPortal } from "react-dom";

export type ModalProps = {
  visible: boolean;
  onClick: () => void;
};

export function ModalView(props: ModalProps) {
  const { visible, onClick } = props;
  const cn = classnames("absolute inset-0 bg-black/20", {
    hidden: !visible,
  });
  return <div className={cn} onClick={onClick}></div>;
}

export function Modal(props: ModalProps) {
  const { visible, onClick } = props;
  const element = <ModalView visible={visible} onClick={onClick} />;
  const target = document.getElementById("portal");
  return target && createPortal(element, target);
}
