<template>

    <div id="post">
        <div class="top-comment">
            <h4>Post de exemple</h4>
            <h5>variable date</h5>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora dolores dolor expedita, voluptate numquam neque aut, laboriosam nisi rem blanditiis pariatur, excepturi iusto cumque consectetur quasi a eaque ducimus. Hic.</p>
        <div class="moderation">
            <button class="btn btn-danger modo-btn" title="Supprimer le post (irréverssible)">Supprimer le post</button>
        </div>
        <div class="section-comment">
            <input type="text" class="comment" placeholder="Cliquez ici pour commenter"/>
            <button class="btn btn-success" title="Envoyer un commentaire sur ce post">Envoyer</button>
        </div>
        <div class="users-comment">
            <h6>name date</h6>
            <p class="unique-com">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ab suscipit soluta voluptatem corrupti
                 porro culpa ratione ad vitae dolor vero, hic nulla harum excepturi tempora repellendus blanditiis fugiat facere.</p>
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
    margin-top: 15px;
}

.comment {
    width: 90%;
    min-height: 35px;
    border-radius: 5px;
    border: 1px solid black;
    margin-right: 10px;
}

.users-comment {
    margin-top: 15px;
}

.unique-com {
    border-bottom: 1px solid black;
}

.reaction-modo, .dislike-block {
    display: flex;
    justify-content: center;
}

.moderation {
    display: flex;
    flex-direction: row;
}

.modo-btn {
    margin-top: 10px;
}

.btn-secondary {
    margin-right: 10px;
}

</style>