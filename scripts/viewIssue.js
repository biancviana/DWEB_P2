const updateIssueButton = document.getElementById('update-issue-button');
const deleteIssueButton = document.getElementById('delete-issue-button');
const systemAnswerView = document.getElementById('system-answer');
const answerButton = document.getElementById('answer-button');

window.onload = () => {
  updateIssueButton.classList.remove('d-none');
  deleteIssueButton.classList.remove('d-none');
  systemAnswerView.classList.remove('d-none');
  answerButton.classList.remove('d-none');
};

function openDeleteIssueModal() {
  $('#delete-issue-modal').modal('toggle');
  $('#delete-issue-modal').modal('show');
}

function deleteIssue() {
  $('#delete-issue-modal').modal('hide');
  alert('apagouuu');
}

function answerIssue() {}

function updateIssueView() {
  window.location.href = 'updateIssue.html';
}
