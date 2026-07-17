import React from 'react'
import { Camera, Image } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Textarea from '@/components/ui/Textarea'

const LabAssistantSampleModal = ({
  showSampleModal,
  setShowSampleModal,
  sampleImages,
  setSampleImages,
  assistantNotes,
  setAssistantNotes,
  handleSampleUpload,
  uploadingSample,
}) => {
  return (
    <Modal
      open={showSampleModal}
      onClose={() => {
        setShowSampleModal(false)
        setSampleImages([])
      }}
      title="Upload Sample"
      subtitle="Upload blood sample tube image"
      size="lg"
    >
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <label
            className="
group
border-2
border-dashed
border-blue-200
hover:border-blue-500
rounded-3xl
p-5 md:p-8
bg-blue-50/40
hover:bg-blue-50
transition
"
          >
            <input
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              onChange={(e) => {
                if (e.target.files[0]) {
                  setSampleImages((prev) => [...prev, e.target.files[0]])
                }
              }}
            />
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[28px] bg-blue-100 group-hover:bg-blue-600 transition flex items-center justify-center text-4xl">
              <Camera size={32} />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-blue-950 mt-6">Capture Sample</h2>
            <p className="text-gray-500 text-center mt-2 text-sm leading-6">
              Open mobile camera and capture blood tube image
            </p>
          </label>
          <label
            className="
group
border-2
border-dashed
border-pink-200
hover:border-pink-500
rounded-3xl
p-5 md:p-8
bg-pink-50/40
hover:bg-pink-50
transition
"
          >
            {' '}
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                setSampleImages((prev) => [...prev, ...Array.from(e.target.files)])
              }}
            />
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[28px] bg-pink-100 group-hover:bg-pink-600 transition flex items-center justify-center text-4xl">
              <Image size={32} />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-blue-950 mt-6">Upload Images</h2>
            <p className="text-gray-500 text-center mt-2 text-sm leading-6">
              Select multiple sample images from gallery
            </p>
          </label>
        </div>
        {sampleImages.length > 0 && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-blue-950">Selected Images</h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {sampleImages.length} Images
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {sampleImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="
  w-16
  h-16
  object-cover
  rounded-xl
  border
  border-gray-200
  "
                  />
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="danger"
                    onClick={() => {
                      setSampleImages(sampleImages.filter((_, i) => i !== index))
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 text-xs"
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setSampleImages([])}
              className="mt-3 text-red-600 text-sm font-medium"
            >
              Remove All Images
            </Button>
          </div>
        )}
        <div className="mt-8">
          <Textarea
            label="Assistant Notes"
            rows={2}
            placeholder="Assistant notes..."
            value={assistantNotes}
            onChange={(e) => setAssistantNotes(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Button
            variant="primary"
            fullWidth
            loading={uploadingSample}
            disabled={uploadingSample || sampleImages.length === 0}
            onClick={handleSampleUpload}
          >
            {uploadingSample ? 'Uploading...' : 'Upload Sample'}
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => {
              setShowSampleModal(false)
              setSampleImages([])
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default LabAssistantSampleModal
