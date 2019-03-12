'use strict'

class AdminController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = AdminController
