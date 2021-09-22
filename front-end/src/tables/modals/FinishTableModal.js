import React, { useState } from "react";
import ReactModal from "react-modal";
import { useHistory } from "react-router-dom";
import { finishTable } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

function FinishTableModal({ modalStatus, setModalStatus, tableId }) {
  const history = useHistory();
  const [finishTableError, setFinishTableError] = useState(null);

  const handleOk = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setFinishTableError(null);

    finishTable(tableId, abortController.signal)
      .then(setModalStatus(false))
      // history.go(0) refreshes the current page (should be /dashboard) so that tables effect hook reloads
      .then(() => history.go(0))
      .catch(setFinishTableError);
    return () => abortController.abort();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setModalStatus(false);
  };

  // for all possible props -> https://reactcommunity.org/react-modal/
  return (
    <ReactModal
      parentSelector={() => document.querySelector("#app-modal")}
      isOpen={
        modalStatus
        /* Boolean describing if the modal should be shown or not. */
      }
      ariaHideApp={
        !modalStatus
        /* Boolean indicating if the appElement should be hidden */
        /*
        ! Warning: react-modal: App element is not defined. Please use `Modal.setAppElement(el)` or set `appElement={el}`. This is needed so screen readers don't see main content when modal is opened. It is not recommended, but you can opt-out by setting `ariaHideApp={false}`. 
        */
      }
      // onAfterOpen={
      //   handleAfterOpenFunc
      //   /* Function that will be run after the modal has opened. */
      // }
      // onAfterClose={
      //   handleAfterCloseFunc
      //   /* Function that will be run after the modal has closed. */
      // }
    >
      <p>Is this table ready to seat new guests? This cannot be undone.</p>
      <button
        className="btn btn-primary"
        data-table-id-finish={`${tableId}`}
        onClick={handleOk}
      >
        Ok
      </button>
      <button className="btn btn-light" onClick={handleCancel}>
        Cancel
      </button>
      <ErrorAlert error={finishTableError} />
    </ReactModal>
  );
}

export default FinishTableModal;
