// ...existing code...
function showSuccessToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        style: {
            background: "#4caf50",
            borderRadius: "4px"
        },
        gravity: "top",
        position: "right",
        close: true
    }).showToast();
}

function showErrorToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        style: {
            background: "#f44336",
            borderRadius: "4px"
        },
        gravity: "top",
        position: "right",
        close: true
    }).showToast();
}
// ...existing code...
