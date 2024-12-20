import { useRef, useState } from 'react'
import { Env } from '@src/constants/environments'
import { useUploadImage } from '@src/hooks/useUploadImage'
import { Button } from '@src/components/button'
import { generateRandomTitle } from '@src/utils/functions/generateRandomTitle'

export default function HomePage() {
    const { uploadImage, deleteImage, uploadToDb, setFiles, files } = useUploadImage()
    const [dragCounter, setDragCounter] = useState(0)
    const [isLoading, setIsLoading] = useState({
        file: false,
        button: false,
    })
    const galleryRef = useRef<HTMLUListElement>(null)
    const hiddenInputRef = useRef<HTMLInputElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const addFile = async (file: File) => {
        setIsLoading((prev) => ({
            ...prev,
            file: true,
        }))
        const data = { file: file, directory: Env.directory }

        await uploadImage(data, file)
        setIsLoading((prev) => ({
            ...prev,
            file: false,
        }))
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            Array.from(e.target.files).forEach((file) => addFile(file))
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (e.dataTransfer.files) {
            Array.from(e.dataTransfer.files).forEach((file) => addFile(file))
        }
        overlayRef.current?.classList.remove('draggedover')
        setDragCounter(0)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        if (e.dataTransfer.items) {
            overlayRef.current?.classList.add('draggedover')
        }
    }

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault()
        setDragCounter((prev) => prev + 1)
        overlayRef.current?.classList.add('draggedover')
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setDragCounter((prev) => prev - 1)
        if (dragCounter === 1) {
            overlayRef.current?.classList.remove('draggedover')
        }
    }

    const handleRemoveFile = async (objectURL: string) => {
        setFiles((prevFiles) => {
            const updatedFiles = { ...prevFiles }
            delete updatedFiles[objectURL]
            return updatedFiles
        })
        const fileName = objectURL.split('/').pop()
        await deleteImage(fileName)
    }

    const handleSubmit = async () => {
        setIsLoading((prev) => ({
            ...prev,
            button: true,
        }))
        if (Object.keys(files).length === 0) {
            alert('No files selected for upload.')
            return
        }

        try {
            const fileUploadPromises = Object.keys(files).map(async (objectURL) => {
                const title = generateRandomTitle()
                await uploadToDb({ title, video: objectURL })
            })
            await Promise.all(fileUploadPromises)
            setFiles({})
            setIsLoading((prev) => ({
                ...prev,
                button: false,
            }))
            alert('File(s) uploaded successfully')
        } catch (error) {
            alert('An error uccured while uploading files, please try again')
            setIsLoading((prev) => ({
                ...prev,
                button: false,
            }))
            console.error('Error uploading files:', error)
        }
    }

    const handleCancel = async () => {
        const fileDeletionPromises = Object.keys(files).map(async (objectURL) => {
            const fileName = objectURL.split('/').pop()
            if (fileName) {
                await deleteImage(fileName)
            }
        })

        await Promise.all(fileDeletionPromises)

        setFiles({})
    }

    return (
        <div className='h-screen w-screen bg-gray-500 sm:px-8 sm:py-8 md:px-16'>
            <Button
                onClick={async () => {
                    const response = await fetch('/api/playlists', { method: 'GET' })

                    if (response.ok) {
                        console.log('<== response ==>', await response.json())
                    }
                }}
            >
                API Test
            </Button>
            <main className='container mx-auto h-full max-w-screen-lg'>
                <article className='relative flex h-full flex-col rounded-md bg-white shadow-xl'>
                    <section className='flex h-full w-full flex-col overflow-auto p-8'>
                        <header
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDragEnter={handleDragEnter}
                            ref={overlayRef}
                            className='flex flex-col items-center justify-center border-2 border-dashed border-gray-400 py-12'
                        >
                            {isLoading.file ?
                                <div role='status' className='py-[3.5rem]'>
                                    <svg
                                        aria-hidden='true'
                                        className='h-8 w-8 animate-spin fill-primary text-gray-200 dark:text-gray-600'
                                        viewBox='0 0 100 101'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                            fill='currentColor'
                                        />
                                        <path
                                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                            fill='currentFill'
                                        />
                                    </svg>
                                    <span className='sr-only'>Loading...</span>
                                </div>
                            :   <>
                                    <p className='mb-3 flex flex-wrap justify-center font-semibold text-gray-900'>
                                        <span className='text-center text-lg text-[#c4c8ce]'>
                                            Drag and drop your files anywhere or
                                        </span>
                                    </p>
                                    <input
                                        ref={hiddenInputRef}
                                        id='hidden-input'
                                        type='file'
                                        multiple
                                        className='hidden'
                                        onChange={handleFileSelect}
                                    />
                                    <button
                                        className='focus:shadow-outline mt-2 rounded-sm px-3 py-1 focus:outline-none'
                                        onClick={() => hiddenInputRef.current?.click()}
                                    >
                                        <div className='flex flex-col items-center justify-center'>
                                            <i>
                                                <svg
                                                    className='mb-3 h-12 w-12 fill-current text-primary hover:text-primary-hover'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='24'
                                                    height='24'
                                                    viewBox='0 0 24 24'
                                                >
                                                    <path d='M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z' />
                                                </svg>
                                            </i>
                                            <p className='text-lg font-semibold text-primary hover:underline'>
                                                Choose your files
                                            </p>
                                        </div>
                                    </button>
                                </>
                            }
                        </header>

                        <h1 className='pb-3 pt-8 font-semibold text-gray-900 sm:text-lg'>To Upload</h1>
                        <ul id='gallery' className='-m-1 flex flex-1 flex-wrap' ref={galleryRef}>
                            {Object.keys(files).length === 0 ?
                                <li className='flex h-full w-full flex-col items-center justify-center text-center'>
                                    <img
                                        className='mx-auto w-32'
                                        src='https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png'
                                        alt='no data'
                                    />
                                    <span className='text-small text-gray-500'>No files selected</span>
                                </li>
                            :   Object.entries(files).map(([key, file]) => {
                                    const isVideo = file.url.endsWith('.mp4') || file.url.endsWith('.webm') // Determine if it's a video by URL or file type
                                    return (
                                        <li key={key} className='xl:w-1/8 block h-24 w-1/2 p-1 sm:w-1/3 md:w-1/4 lg:w-1/6'>
                                            <article className='group relative h-full w-full cursor-pointer rounded-md bg-gray-100 shadow-sm'>
                                                {isVideo ?
                                                    <video
                                                        className='img-preview group sticky h-full w-full rounded-md object-cover'
                                                        src={file.url}
                                                        controls
                                                    />
                                                :   <img
                                                        className='img-preview group sticky h-full w-full rounded-md object-cover'
                                                        src={file.url}
                                                        alt='preview'
                                                    />
                                                }
                                                <section className='absolute top-0 hidden h-full w-full flex-col break-words rounded-md bg-[rgb(77_77_77_/_57%)] px-3 py-2 text-xs text-white group-hover:flex'>
                                                    <h1 className='flex-1'>{file.name}</h1>
                                                    <div className='flex'>
                                                        <p className='size p-1 text-xs'>
                                                            {file.size > 1024 ?
                                                                file.size > 1048576 ?
                                                                    `${Math.round(file.size / 1048576)}mb`
                                                                :   `${Math.round(file.size / 1024)}kb`
                                                            :   `${file.size}b`}
                                                        </p>
                                                        <button
                                                            className='delete ml-auto rounded-md text-gray-800 focus:outline-none'
                                                            onClick={() => handleRemoveFile(key)}
                                                        >
                                                            <svg
                                                                className='pointer-events-none ml-auto h-4 w-4 fill-current text-white'
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                width='24'
                                                                height='24'
                                                                viewBox='0 0 24 24'
                                                            >
                                                                <path d='M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z' />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </section>
                                            </article>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>

                    <footer className='flex justify-end gap-3 px-8 pb-8 pt-4'>
                        <Button color='primary' variant='solid' isLoading={isLoading.button} onClick={handleSubmit}>
                            Upload now
                        </Button>
                        <Button color='default' onClick={handleCancel}>
                            Cancel
                        </Button>
                    </footer>
                </article>
            </main>
        </div>
    )
}
