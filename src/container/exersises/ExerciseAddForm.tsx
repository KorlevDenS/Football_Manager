import {FormHelperText, InputAdornment, OutlinedInput, styled, TextField} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import {Exercise} from "../../db_classes";
import './ExerciseAddForm.css';
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';

interface ExerciseAddProps {
    setModalActive(isActive: boolean): void;
    setLoggedIn(loggedIn: boolean): void;
    getExercises(): void;
}

export default function EventAddForm({setModalActive, setLoggedIn, getExercises}: ExerciseAddProps) {

    const [title, setTitle] = useState<string>("");
    const [technic, setTechnic] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null)
    const [video, setVideo] = useState<File | null>(null);
    const [duration, setDuration]
        = useState<string>("1");
    const [amount, setAmount] = useState<number>(1);
    const [muscle_load, setMuscle_load] = useState<string>("ОФП");
    const [equipment, setEquipment] = useState<string>("");
    const [min_people, setMin_people] = useState<number>(1);


    const sqlTime = (time: Date) => {
        return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (photo !== null) {
            const photoData = new FormData();
            photoData.append("image", photo);

            let token = localStorage.getItem("jwtToken");
            await fetch(`/exercise/add/photo`, {
                method: 'POST',
                headers: {
                    'Authorization': token != null ? token : ""
                },
                body: photoData
            }).then( response => {
                    if (response.status === 404) {
                        console.log("NO PHOTO");
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );

        }

        if (video !== null) {
            const videoData = new FormData();
            videoData.append("video", video);

            let token = localStorage.getItem("jwtToken");
            await fetch(`/exercise/add/video`, {
                method: 'POST',
                headers: {
                    'Authorization': token != null ? token : "",
                },
                body: videoData
            }).then( response => {
                    if (response.status === 404) {
                        console.log("NO VIDEO");
                    } else if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.setItem("loggedIn", "false");
                    }
                }
            );
        }

        let exercise = new Exercise(title, technic, null, null,
            sqlTime(new Date(Number(duration) * 60000)),
            amount, muscle_load, equipment, min_people);

        console.log(exercise);

        let token = localStorage.getItem("jwtToken");
        await fetch(`/exercise/add/new`, {
            method: 'POST',
            headers: {
                'Authorization': token != null ? token : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercise)
        }).then( response => {
                if (response.ok) {
                    const data = response.json();
                    data.then(value => {console.log(value)});
                    setModalActive(false);
                    getExercises();
                } else if (response.status === 401) {
                    setLoggedIn(false);
                    localStorage.setItem("loggedIn", "false");
                }
            }
        );
    }

    const durationFilter = (event: ChangeEvent<HTMLInputElement>) => {
        const inputChar = event.target.value.slice(-1);
        const inputStr = event.target.value;
        if (!/^\d*$/.test(inputChar)) {
            return;
        }
        if (Number(inputStr) > 240) return;
        event.target.value = event.target.value.replace(/^0+/, '');
        setDuration(event.target.value);
    };

    const amountFilter = (event: ChangeEvent<HTMLInputElement>) => {
        const inputChar = event.target.value.slice(-1);
        if (!/^\d*$/.test(inputChar)) {
            return;
        }
        event.target.value = event.target.value.replace(/^0+/, '');
        setAmount(Number(event.target.value));
    };

    const peopleFilter = (event: ChangeEvent<HTMLInputElement>) => {
        const inputChar = event.target.value.slice(-1);
        if (!/^\d*$/.test(inputChar)) {
            return;
        }
        event.target.value = event.target.value.replace(/^0+/, '');
        setMin_people(Number(event.target.value));
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files && event.target.files[0];
        if (selectedImage && selectedImage.type.startsWith('image/')) {
            setPhoto(selectedImage);
            console.log(selectedImage);
        } else {
            console.log("failed to load image");
            return;
        }
    }

    const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedVideo = event.target.files && event.target.files[0];
        if (selectedVideo && selectedVideo.type.startsWith('video/')) {
            setVideo(selectedVideo);
        } else {
            console.log("failed to load video");
            return;
        }
    }


    return (
        <form className="ExerciseAddForm" onSubmit={handleSubmit}>
            <div className={"exercise-add-form-part"}>
                <FormHelperText id="outlined-weight-helper-text">Название</FormHelperText>
                <TextField id="outlined-basic" variant="outlined" required={true}
                           onChange={e => setTitle(e.target.value)}/>
                <FormHelperText id="outlined-weight-helper-text">Техника выполнения</FormHelperText>
                <TextField id="outlined-multiline-flexible" multiline maxRows={4} required={true}
                           onChange={e => setTechnic(e.target.value)}/>
                <FormHelperText id="outlined-weight-helper-text">Длительность</FormHelperText>
                <OutlinedInput
                    id="outlined-adornment-weight"
                    value={duration}
                    onChange={durationFilter}
                    required={true}
                    endAdornment={<InputAdornment position="end">мин.</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
                <FormHelperText id="outlined-weight-helper-text">Количество повторов</FormHelperText>
                <OutlinedInput
                    id="outlined-adornment-weight"
                    value={amount}
                    onChange={amountFilter}
                    required={true}
                    endAdornment={<InputAdornment position="end">раз</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
                <FormHelperText id="outlined-weight-helper-text">Изображение</FormHelperText>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload image
                    <VisuallyHiddenInput type="file" accept={"image/*"} onChange={handleImageChange}/>
                </Button>
            </div>
            <div className={"exercise-add-form-part"}>
                <FormHelperText id="outlined-weight-helper-text">Вид нагрузки</FormHelperText>
                <TextField id="outlined-basic" variant="outlined" required={true}
                           onChange={e => setMuscle_load(e.target.value)}/>
                <FormHelperText id="outlined-weight-helper-text">Необходимый инвентарь</FormHelperText>
                <TextField id="outlined-basic" variant="outlined"
                           onChange={e => setEquipment(e.target.value)}/>
                <FormHelperText id="outlined-weight-helper-text">Мин. количество человек</FormHelperText>
                <OutlinedInput
                    id="outlined-adornment-weight"
                    value={min_people}
                    onChange={peopleFilter}
                    required={true}
                    endAdornment={<InputAdornment position="end">чел.</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
                <FormHelperText id="outlined-weight-helper-text">Видео</FormHelperText>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload video
                    <VisuallyHiddenInput type="file" accept={"video/*"} onChange={handleVideoChange}/>
                </Button>
                <FormHelperText >Сохранить упражнение</FormHelperText>
                <Button type={"submit"} variant="contained" startIcon={<AddIcon/>}>Создать упражнение</Button>
            </div>


        </form>
    );
}