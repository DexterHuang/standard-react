import * as React from "react";
import { ModalDispatcher } from "../StandardComponents/ModalDispatcher/ModalDispatcher";

export class ModalHandler {
  static modalDispatcher: ModalDispatcher;

  static show(content: any) {
    this.modalDispatcher.show(content);
  }
}
