import { useState } from "react";
// import * as React from "react";
// import {
//   DataGridPro,
//   useGridApiRef,
//   gridVisibleColumnDefinitionsSelector,
//   gridExpandedSortedRowIdsSelector,
// } from "@mui/x-data-grid-pro";
// import { useDemoData } from "@mui/x-data-grid-generator";

function RealTimeFB() {
  //   const apiRef = useGridApiRef();

  //   const [coordinates, setCoordinates] = React.useState({
  //     rowIndex: 0,
  //     colIndex: 0,
  //   });

  //   const { data, loading } = useDemoData({
  //     dataSet: "Commodity",
  //     rowLength: 100,
  //   });

  //   React.useEffect(() => {
  //     const { rowIndex, colIndex } = coordinates;
  //     apiRef.current?.scrollToIndexes(coordinates);
  //     const id = gridExpandedSortedRowIdsSelector(apiRef)[rowIndex];
  //     const column = gridVisibleColumnDefinitionsSelector(apiRef)[colIndex];
  //     apiRef.current?.setCellFocus(id, column.field);
  //   }, [apiRef, coordinates]);

  //   const handleCellClick = (params) => {
  //     const rowIndex = gridExpandedSortedRowIdsSelector(apiRef).findIndex(
  //       (id) => id === params.id,
  //     );
  //     const colIndex = gridVisibleColumnDefinitionsSelector(apiRef).findIndex(
  //       (column) => column.field === params.field,
  //     );
  //     setCoordinates({ rowIndex, colIndex });
  //   };

  return (
    <>
      <div className="FBboard FBframe">
        <div className="FBtime">
          <p className="FBTimeText">10:00</p>
        </div>
        <div className="FBcontener">
          <div className="FBtext">
            …トヨタのマルチパスウェイ戦略とは、複数の技a術を並行開発していく戦略です。
          </div>
        </div>
      </div>
      {/* <DataGridPro
        apiRef={apiRef}
        onCellClick={handleCellClick}
        hideFooter
        loading={loading}
        {...data}
        initialState={{
          ...data.initialState,
          scroll: { top: 1000, left: 1000 },
        }}
      /> */}
    </>
  );
}

export default RealTimeFB;
