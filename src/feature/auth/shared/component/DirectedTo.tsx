import { Button } from '#components/ui/button'
import React from 'react'
import { Link } from 'react-router'

export default function DirectedTo({haveOrNot, pageName, link}: {haveOrNot: string, pageName: string, link: string}) {
  return (
    <p className="font-mono font-medium text-[rem] text-center text-gray-500 mt-8">{haveOrNot} <Button variant="link" nativeButton={false} render={<Link to={link}/>}> {pageName} </Button></p>
  )
}
