import strapier from '../strapier'

const teamMembers = {
    res: { data: null },
    req: async () => await query(),
    data: () => strapier.formatter.getData(teamMembers.res),
    pagination: () => strapier.formatter.getPagination(teamMembers.res)
}

const query = async () => {
    const url = `/team-members`
    return (teamMembers.res = await strapier.fetch(url))
}

export default teamMembers
