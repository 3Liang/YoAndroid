/**
 * Common dialog.
 */
function showMessage(title, content, confirmText, success) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    cancelText: '',
    cancelColor: '',
    confirmText: confirmText,
    confirmColor: '',
  })
}

function showConfirmMessage(title, content, confirmText, cancelText, success, cancel) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: true,
    cancelText: cancelText,
    cancelColor: '',
    confirmText: confirmText,
    confirmColor: '',
    success: function(res) {
      if (res.confirm) success()
      else cancel()
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}

module.exports = {
  showMessage: showMessage,
  showConfirmMessage: showConfirmMessage
}