const {request} = useHttp()
const auth = useContext(AuthContext)
const [link, setLink] = useState(null)
const linkId = useParams().id

const getLink = useCallback(async() => {
    try {
        const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
            Authorization: `Bearer ${auth.token}`
        })

        setLink(fetched)

    } catch (e) {

    }
}, [token, linkId, request])

useEffect(() => {
    getLink();
}, [getLink])