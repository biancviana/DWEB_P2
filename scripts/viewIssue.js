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
