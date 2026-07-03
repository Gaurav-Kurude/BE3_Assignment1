const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

const albums = [

  { id: 1, title: 'Abbey Road', artist: 'The Beatles', year: 1969 },

  { id: 2, title: 'The Dark Side of the Moon', artist: 'Pink Floyd', year: 1973 },

  { id: 3, title: 'Thriller', artist: 'Michael Jackson', year: 1982 }

];


app.get("/", (req, res) => {
  res.send("Hello, This is Express Assignment Server.");
});

app.post("/albums/:id", (req, res) => {
    const albumId = parseInt(req.params.id);
    const updatedAlbumData = req.body;

    const albumIndex = albums.findIndex(album => album.id === albumId);

    if (albumIndex === -1) {
        return res.status(404).json({
            error: "Album does not exist"
        });
    }

    Object.assign(albums[albumIndex], updatedAlbumData);

    res.status(200).json({
        message: "Album updated successfully",
        album: albums[albumIndex]
    });
});

app.delete("/albums/:id", (req, res)=> {
    const albumId = req.params.id;

    const index = albums.findIndex(album => album.id == albumId);
    
    if(index === -1){
        res.status(404).json({ error: "Album not found" });
    } else {
        albums.splice(index, 1);
        res.status(200).json({ message: "Album deleted successfully" });
    }  
});


app.get("/albums", (req, res) => {
    res.send(albums);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});