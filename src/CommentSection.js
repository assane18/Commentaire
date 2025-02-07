import { useState } from 'react';
import { FaBold, FaItalic, FaSmile, FaImage, FaGlobe } from 'react-icons/fa';
import Picker from 'emoji-picker-react';

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [image, setImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyTexts, setReplyTexts] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim() || image) {
      setComments([
        { text: newComment, image, id: Date.now(), replies: [], user: 'User1' },
        ...comments
      ]);
      setNewComment('');
      setImage(null);
      setPreviewImage(null);
      setIsAddingComment(false);
    }
  };

  const handleReply = (index) => {
    if (replyTexts[index]?.trim()) {
      const updatedComments = [...comments];
      updatedComments[index].replies.push(replyTexts[index]);
      setComments(updatedComments);
      setReplyTexts({ ...replyTexts, [index]: '' });
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewComment(newComment + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleBold = () => {
    setBoldActive(!boldActive);
    setItalicActive(false);
    setNewComment(newComment + (boldActive ? '' : ' <b>Texte en gras</b> '));
  };

  const toggleItalic = () => {
    setItalicActive(!italicActive);
    setBoldActive(false);
    setNewComment(newComment + (italicActive ? '' : ' <i>Texte en italique</i> '));
  };

  return (
    <div className="comment-container">
      <h2 className="title">Fil d'actualité</h2>
      {!isAddingComment && (
        <button className="new-comment-button" onClick={() => setIsAddingComment(true)}>
          Nouveau commentaire
        </button>
      )}
      {isAddingComment && (
        <div className="new-comment-section">
          <div className="user-profile">
            <img src="https://jolstatic.fr/www/captures/4171/5/169935.jpg" alt="Avatar" className="avatar" />
            <span className="username">User1</span>
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="comment-input"
          />
          {previewImage && <img src={previewImage} alt="Preview" className="comment-image" />}
          <div className="comment-actions">
            <div className="formatting-options">
              <FaSmile onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="icon" />
              <FaBold onClick={toggleBold} className={boldActive ? 'icon active' : 'icon'} />
              <FaItalic onClick={toggleItalic} className={italicActive ? 'icon active' : 'icon'} />
              <FaImage onClick={() => document.getElementById('imageUpload').click()} className="icon" />
              <input type="file" id="imageUpload" style={{ display: 'none' }} onChange={handleImageUpload} />
            </div>
            <button className="publish-button" onClick={handleAddComment}>
              Poster
            </button>
          </div>
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      )}
      <div className="comment-list">
        {comments.map((comment, index) => (
          <div className="comment" key={comment.id}>
            <div className="user-profile">
              <img src="https://jolstatic.fr/www/captures/4171/5/169935.jpg" alt="Avatar" className="avatar" />
              <span className="username">{comment.user}</span>
            </div>
            {comment.image && <img src={comment.image} alt="Comment" className="comment-image-large" />}
            <p>{comment.text}</p>
            <div className="reply-list">
              {comment.replies.map((reply, replyIndex) => (
                <div className="reply" key={replyIndex}>
                  <p>{reply}</p>
                </div>
              ))}
            </div>
            <div className="reply-section">
              <textarea
                value={replyTexts[index] || ''}
                onChange={(e) => setReplyTexts({ ...replyTexts, [index]: e.target.value })}
                placeholder="Répondre..."
                className="reply-box"
              />
              <button className="reply-button" onClick={() => handleReply(index)}>
                Répondre
              </button>
            </div>
            <hr className="separator" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
