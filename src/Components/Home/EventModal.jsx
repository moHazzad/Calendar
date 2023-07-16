import { useContext, useState } from 'react';
import GlobalContext from '../../Context/GlobalContext';

import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ScheduleIcon from '@material-ui/icons/Schedule';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CheckIcon from '@material-ui/icons/check';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const labelsClasses = [
  'indigo',
  'gray',
  'green',
  'blue',
  'red',
  'purple',
];

const EventModal = () => {
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const {
    setShowEventModal,
    daySelected,
    // dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      fetch(img_hosting_url, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((imgResponse) => {
          console.log(imgResponse);
          if (imgResponse.success) {
            const imgURL = imgResponse.data.display_url;

            const calendarEvent = {
              image: imgURL,
              title,
              description,
              label: selectedLabel,
              day: daySelected.format(),
              id: selectedEvent ? selectedEvent.id : Date.now(),
            };

            fetch('http://localhost:5000/event', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(calendarEvent),
            })
              .then((res) => res.json())
              .then((data) => console.log(data));

            setShowEventModal(false);
          }
        });
    }
  }

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/event/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <DragHandleIcon className="text-gray-400" />

          <div>
            {selectedEvent && (
              <DeleteIcon
                onClick={() => {
                  handleDelete(selectedEvent._id);
                  setShowEventModal(false);
                }}
                className="text-gray-400 cursor-pointer"
              />
            )}
            <button onClick={() => setShowEventModal(false)}>
              <CloseIcon className="text-gray-400" />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <input
              type="file"
              name="image"
              placeholder="Add Photo"
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex gap-4 items-center">
              <ScheduleIcon className="text-gray-400" />
              <p>{daySelected.format('dddd, MMMM DD')}</p>
            </div>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex gap-4">
              <BookmarkBorderIcon className="text-gray-400" />
              <div className="flex gap-x-2">
                {labelsClasses.map((lblClass, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  >
                    {selectedLabel === lblClass && (
                      <CheckIcon className="text-white text-sm" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
