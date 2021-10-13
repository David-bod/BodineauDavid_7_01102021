<template>

    <div id="post">
        <div class="top-comment">
            <h4>Post de {{ userid }} exemple</h4>
            <h5>variable date</h5>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora dolores dolor expedita, voluptate numquam neque aut, laboriosam nisi rem blanditiis pariatur, excepturi iusto cumque consectetur quasi a eaque ducimus. Hic.</p>
        <div class="section-comment">
            <input type="text" class="comment" placeholder="Cliquez ici pour commenter"/>
            <button class="btn btn-dark" title="Envoyer un commentaire sur ce post">Envoyer</button>
        </div>
        <div class="moderation">
            <a href="#" title="Supprimer le post (irréverssible)"><i class="fas fa-times delete-post"></i></a>
        </div>
        <div class="reaction-modo">
            <div class="reaction">
                <div class="dislike-block">
                    <a href="#" class="click-dis" title="Mettre un Dislike"><i class="fas fa-heart-broken"></i></a>
                    <p class="count-dislike">2</p>
                </div>
                <div class="like-block">
                    <a href="#" class="click-like" title="Mettre un Like"><i class="fas fa-heart"></i></a>
                    <p class="count-like">0</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'post'
}
</script>

<style>

#post {
    background: rgb(255, 246, 233);
    padding: 10px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid rgb(255, 234, 205);
}

h4, h5 {
    margin: 0;
    margin-left: 5px;
    margin-top: 5px;
}

.top-comment {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 15px;
}

.section-comment {
    display: flex;
}

.comment {
    width: 90%;
    min-height: 35px;
    border-radius: 5px;
    border: 1px solid black;
    margin-right: 10px;
}

.reaction-modo, .reaction, .dislike-block, .like-block {
    display: flex;
    justify-content: center;
}

.reaction-modo {
    align-items: center;
}

.moderation {
    display: flex;
    flex-direction: row;
}

i {
    margin-left: 5px;
    margin-right: 5px;
}

.click-dis {
    color: brown;
}

.click-like {
    color: green;
}

.delete-post {
    color: red;
    font-size: 1.4em;
}
</style>