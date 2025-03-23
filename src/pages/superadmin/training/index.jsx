import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Upload, Play } from 'lucide-react';

// Validation schema for the form
const VideoUploadSchema = Yup.object().shape({
  videoFile: Yup.mixed().required('Please upload a video file'),
  videoTitle: Yup.string().required('Video title is required'),
  videoDescription: Yup.string().required('Video description is required')
});

const Trainings = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Training Class 1',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard dummy text.',
      thumbnail: '/thumbnail1.jpg',
      duration: '01:30'
    },
    {
      id: 2,
      title: 'Training Class 2',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard dummy text.',
      thumbnail: '/thumbnail2.jpg',
      duration: '02:15'
    },
    {
      id: 3,
      title: 'Training Class 3',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard dummy text.',
      thumbnail: '/thumbnail3.jpg',
      duration: '01:45'
    },
    {
      id: 4,
      title: 'Training Class 4',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard dummy text.',
      thumbnail: '/thumbnail4.jpg',
      duration: '03:10'
    },
    {
      id: 5,
      title: 'Training Class 5',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard dummy text.',
      thumbnail: '/thumbnail5.jpg',
      duration: '01:55'
    }
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setSelectedFile(file);
    setFieldValue('videoFile', file);
  };

  const handleSubmit = (values, { resetForm }) => {
    // Here you would typically upload the file to your server
    console.log('Form values:', values);
    
    // Add the new video to the list (in a real app, this would happen after successful upload)
    const newVideo = {
      id: videos.length + 1,
      title: values.videoTitle,
      description: values.videoDescription,
      thumbnail: '/placeholder-thumbnail.jpg', // You would use the actual thumbnail
      duration: '00:00' // You would extract this from the video
    };
    
    setVideos([...videos, newVideo]);
    
    // Reset the form
    resetForm();
    setSelectedFile(null);
  };

  return (
    <div className="bg-gray-100 p-4 md:p-6">
      {/* Upload Video Section */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">Upload Video</h2>
      
      <div className="bg-white rounded-md shadow mb-8">
        <div className="grid grid-cols-12 gap-2 p-3 bg-gray-800 text-white rounded-t-md">
          <div className="col-span-4 font-medium">Upload File</div>
          <div className="col-span-4 font-medium">Video Title</div>
          <div className="col-span-4 font-medium">Video Description</div>
        </div>
        
        <Formik
          initialValues={{
            videoFile: null,
            videoTitle: '',
            videoDescription: ''
          }}
          validationSchema={VideoUploadSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting, errors, touched }) => (
            <Form className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* File Upload Field */}
                <div className="md:col-span-4">
                  <div className={`border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center h-24 
                    ${errors.videoFile && touched.videoFile ? 'border-red-500' : 'border-gray-300'}`}>
                    <input
                      id="videoFile"
                      name="videoFile"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                    />
                    
                    {!selectedFile ? (
                      <label 
                        htmlFor="videoFile" 
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <button
                          type="button"
                          className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded mb-1"
                          onClick={() => document.getElementById('videoFile').click()}
                        >
                          Choose File
                        </button>
                        <span className="text-xs text-gray-500">No file chosen</span>
                      </label>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm truncate w-full">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    )}
                  </div>
                  <ErrorMessage 
                    name="videoFile" 
                    component="div" 
                    className="text-red-500 text-xs mt-1" 
                  />
                </div>

                {/* Title Field */}
                <div className="md:col-span-4">
                  <Field
                    type="text"
                    name="videoTitle"
                    placeholder="Enter video title"
                    className={`w-full p-2 border rounded-md h-24 
                      ${errors.videoTitle && touched.videoTitle ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <ErrorMessage 
                    name="videoTitle" 
                    component="div" 
                    className="text-red-500 text-xs mt-1" 
                  />
                </div>

                {/* Description Field */}
                <div className="md:col-span-4 flex flex-col">
                  <Field
                    as="textarea"
                    name="videoDescription"
                    placeholder="Enter video description"
                    className={`w-full p-2 border rounded-md h-24 resize-none 
                      ${errors.videoDescription && touched.videoDescription ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <ErrorMessage 
                    name="videoDescription" 
                    component="div" 
                    className="text-red-500 text-xs mt-1" 
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center"
                >
                  <Upload size={16} className="mr-2" />
                  Upload Video
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* All Videos Section */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">All Videos</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-md shadow overflow-hidden">
            {/* Video Thumbnail */}
            <div className="relative">
              <div className="bg-gray-700 h-40 flex items-center justify-center">
                {/* Placeholder for thumbnail - in a real app you'd use an actual image */}
                <div className="relative w-full h-full bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={48} className="text-white opacity-80" />
                  </div>
                </div>
              </div>
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            
            {/* Video Info */}
            <div className="p-3">
              <h3 className="font-medium text-gray-800 mb-1">{video.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-3">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainings;