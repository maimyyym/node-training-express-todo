document.querySelectorAll('[id^="edit_modal_button_"]').forEach((button) => {
    button.addEventListener('click', (event) => {
        const taskId = event.target.dataset.taskid;
        console.log(taskId)
        const modal = document.querySelector(`#edit_modal_${taskId}`);
        modal.style.display = 'flex';
    });
});

document.querySelectorAll('[id^="edit_modal_close_"]').forEach((close_button) => {
    close_button.addEventListener('click', (event) => {
        const taskId = event.target.dataset.taskid;
        const modal = document.querySelector(`#edit_modal_${taskId}`);
        modal.style.display = 'none';
    });
});

// modalはスコープの外？で定義して使いまわせないのか
// querySelectorAllは「含む」と取得するのか
