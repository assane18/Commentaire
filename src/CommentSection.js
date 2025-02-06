import { useState } from 'react';
import { FaBold, FaItalic, FaSmile, FaImage, FaGlobe } from 'react-icons/fa';
import Picker from 'emoji-picker-react';

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [image, setImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyTexts, setReplyTexts] = useState({});

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { text: newComment, image, id: Date.now(), replies: [] }
      ]);
      setNewComment('');
      setImage(null);
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
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const applyFormatting = (type) => {
    if (type === 'bold') {
      setNewComment(newComment + ' **bold** ');
    } else if (type === 'italic') {
      setNewComment(newComment + ' *italique* ');
    }
  };

  return (
    <div className="comment-container">
      <div className="Titre">Nouveau commentaire</div>
      <div className="test">...</div>
      <div className="user-profile">
        <img src="https://jolstatic.fr/www/captures/4171/5/169935.jpg" alt="Avatar" className="avatar" />
        <span className="username">User1</span>
      </div>

      <div className="comment-box">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="comment-input"
        />
      </div>

      <div className="privacy-setting">
        <FaGlobe className="privacy-icon" />
        <span>Tout le monde peut répondre</span>
      </div>

      <div className="comment-actions">
        <div className="formatting-options">
          <FaSmile onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="icon" />
          <FaBold onClick={() => applyFormatting('bold')} className="icon" />
          <FaItalic onClick={() => applyFormatting('italic')} className="icon" />
          <FaImage onClick={() => document.getElementById('imageUpload').click()} className="icon" />
          <input type="file" id="imageUpload" style={{ display: 'none' }} onChange={handleImageUpload} />
        </div>
        <button className="publish-button" onClick={handleAddComment}>
          Poster
        </button>
      </div>

      {showEmojiPicker && (
        <div className="emoji-picker">
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <div className="comment-list">
        {comments.map((comment, index) => (
          <div className="comment" key={comment.id}>
            <p>{comment.text}</p>
            {comment.image && <img src={comment.image} alt="Comment" className="comment-image" />}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
