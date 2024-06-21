import React from 'react'

import {Controller } from 'react-hook-form';

import {Editor} from '@tinymce/tinymce-react'

// editor is component : Kind of text Editor , 3rd party editor
// In React Hook Form, Controller is a component that responsible for providing a way to work with controlled component (other ui component)
// see docs for more info 


/*{label && <label className='inline-block mb-1 pl-1'>{label}</label>}*/

export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        apiKey='ignua3num9usy77lf2co78ixoxgx54daoe4ppy9had36jt78'
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}