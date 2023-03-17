import React from 'react'
import TopBar from '../components/Topbar/topbar'
import Footer from '../components/Footer/footer'
import RoadWorkSign from '../components/RoadWorkAhead/roadWorkSign'

export function Index({ title }: { title: string }) {
    return (
        <>
            <TopBar />
            <div className={`container m-auto p-2`}>
                <RoadWorkSign />
            </div>
            <Footer />
        </>
    )
}

export default Index
