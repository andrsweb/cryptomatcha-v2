import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostBySlug } from '../../../../api/postApi'
import './NewsSingle.scss'
import DOMPurify from 'dompurify'
import { MdDateRange } from 'react-icons/md'
import { SlGraph } from 'react-icons/sl'
import { IoMdTime } from 'react-icons/io'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { TwitterShareButton, XIcon } from 'react-share'
import { FaRegCopy } from 'react-icons/fa'

const API_BASE_URL = 'https://ffb671a86d02.vps.myjino.ru'

const NewsSingle = () => {
    const { category, slug } = useParams<{ category?: string; slug?: string }>()
    const [post, setPost] = useState<any | null>(null)
    const [copySuccess, setCopySuccess] = useState<string>('')

    useEffect(() => {
        if (category && slug) {
            fetchPost(category, slug)
        }
    }, [category, slug])

    const fetchPost = async (category: string, slug: string) => {
        try {
            const response = await getPostBySlug(category, slug)
            console.log('Fetched post:', response.data)
            setPost(response.data)
			console.log(post.reading_time)
        } catch (error) {
            console.error('Error fetching post:', error)
        }
    }

    if (!post) {
        return <div>Loading...</div>
    }

    const sanitizedContent = DOMPurify.sanitize(post.text)
    const postUrl = `${window.location.origin}/news/${category}/${slug}`

    const handleCopy = () => {
        setCopySuccess('URL copied!')
        setTimeout(() => setCopySuccess(''), 2000)
    }

	const getReadingTimeText = (minutes: number) => {
		if (minutes === 1) {
			return `${minutes} minute read`
		} else {
			return `${minutes} minutes read`
		}
	}
	

    return (
        <div className="sections">
            <section className="news-single">
                <div className="container">
                    <div className="news-single-wrapper">
                        <div className="news-single-info">
                            <span className="category">{post.category_name}</span>
                            <h1>{post.title}</h1>
                            <div className="news-single-inner">
                                <div className="news-single-articles-info">
                                    <div className="news-single-info-item">
                                        <MdDateRange /> <span>{new Date(post.publication_date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="news-single-info-item">
                                        <SlGraph /> <span>{post.views}</span> views
                                    </div>
                                    <div className="news-single-info-item">
										<IoMdTime /> <span>{getReadingTimeText(post.reading_time)}</span>
                                    </div>
                                </div>
                                <div
                                    className="news-content"
                                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                                />
                                <div className="news-sharing">
                                    <TwitterShareButton url={postUrl} title={post.title}>
                                        <XIcon size={36} round={true} />
                                    </TwitterShareButton>

                                    <CopyToClipboard text={postUrl} onCopy={handleCopy}>
                                        <button className="copy-button">
                                            <FaRegCopy />
                                        </button>
                                    </CopyToClipboard>
                                    {copySuccess && <span className="copy-success">{copySuccess}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="news-single-img">
                            {post.image_path && (
                                <img
                                    src={`${API_BASE_URL}${post.image_path}`}
                                    alt={post.title}
                                    className="news-image"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NewsSingle
