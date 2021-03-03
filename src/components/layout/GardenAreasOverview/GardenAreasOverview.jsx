/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ElementOverview from '../../common/ElementOverview';
import gardenAreaPropStyle from '../../../propTypes/gardenArea';
import AddGardenAreaDialog from '../AddGardenAreaDialog';
// import GardenAreasPrompts from '../GardenAreasPrompts';
import GardenAreasCollection from '../GardenAreasCollection';
import useDialog from '../../../hooks/useDialog';

// eslint-disable-next-line no-unused-vars
const renderCollection = (items, filterString = null) => {
  let itemsToRender = items;

  if (filterString) {
    itemsToRender = itemsToRender
      .filter((i) => i.name.toLowerCase().includes(filterString.toLowerCase()));
  }

  return (
    <ul className="garden-areas-list">
      {itemsToRender.map((item) => (
        <li key={item.id}>
          <p>
            <Link to={`/garden/areas/${item.id}`}>
              {item.name}
            </Link>
          </p>
          <p>
            {item.length_cm && `Lenght: ${item.length_cm}cm`}
          </p>
          <p>
            {item.width_cm && `Width: ${item.width_cm}cm`}
          </p>
          <button type="button">Delete</button>
          <button type="button">Edit</button>
        </li>
      ))}
    </ul>
  );
};

const SearchAreaDialog = ({ filter, filterHandler, closeDialog }) => {
  useEffect(() => () => filterHandler(''), []);
  return (
    <form>
      <button
        type="button"
        onClick={() => {
          closeDialog();
        }}
      >
        X
      </button>
      <label htmlFor="filter-areas">
        <p>Filter list of areas by name:</p>
        <input
          id="filter-areas"
          type="search"
          value={filter}
          onChange={({ target: { value } }) => filterHandler(value)}
        />
      </label>
    </form>
  );
};

const GardenAreasOverview = ({ data, onAreaSubmit, areaSubmitStatus }) => {
  const [collectionFilter, setCollectionFilter] = useState('');
  const [idToDelete, setIdToDelete] = useState('');
  const [idToEdit, setIdToEdit] = useState('');

  const {
    isDialogOpen,
    toggleDialog,
    openDialog,
    closeDialog,
  } = useDialog();

  // Element overview component takes this object
  const gardenAreasElement = () => ({
    id: 'areas-overview',
    name: 'Garden Areas',
    // collection: data,
    prompts: {
      addArea: {
        id: 1,
        action: 'Add new area',
        desc: 'Add a representation of an area of your garden',
        dialogComponent: AddGardenAreaDialog,
        dialogProps: {
          onAreaSubmit,
          areaSubmitStatus,
          closeDialog,
        },
        // actionHandler: onAreaSubmit,
      },
      filterAreaList: {
        id: 2,
        action: 'Filter',
        desc: 'Enter a name to filter the list',
        dialogComponent: SearchAreaDialog,
        dialogProps: {
          filter: collectionFilter,
          filterHandler: setCollectionFilter,
          closeDialog,
        },
        // actionHandler: () => {},
      },
    },
  });

  return (
    <section id="garden-areas-collection">
      <ElementOverview
        element={gardenAreasElement()}
        collection={(
          <GardenAreasCollection
            items={data}
            filterString={collectionFilter}
            deleteControl={{ idToDelete, setIdToDelete }}
            editControl={{ idToEdit, setIdToEdit }}
          />
        )}
        dialogControls={{
          isDialogOpen,
          toggleDialog,
          openDialog,
          closeDialog,
        }}
        // elementPrompts={React.createElement(GardenAreasPrompts, {
        //   onAreaSubmit,
        //   areaSubmitStatus,
        // })}
        // dialogContent={AddGardenAreaDialog({ onAreaSubmit, areaSubmitStatus })}
      />
    </section>
  );
};

GardenAreasOverview.propTypes = {
  data: PropTypes.arrayOf(gardenAreaPropStyle),
  onAreaSubmit: PropTypes.func,
  areaSubmitStatus: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    submitError: PropTypes.string,
  }),
};

GardenAreasOverview.defaultProps = {
  data: [],
  onAreaSubmit: () => {},
  areaSubmitStatus: {
    isSubmitting: false,
    submitError: '',
  },
};

export default GardenAreasOverview;
