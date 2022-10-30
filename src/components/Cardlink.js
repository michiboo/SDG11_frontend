import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export function makeCardLink(linksElement, icon){
    return (
        <Card sx={{ minWidth: "10vw" }}>
          <CardContent>
            {icon}
          </CardContent>
          <CardActions style={{textAlign:"center"}}>
                {linksElement}
          </CardActions>
        </Card>
      );
}