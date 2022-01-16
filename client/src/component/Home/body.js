import Section1 from "./body/section1";//section1
import Section2 from "./body/section2";
import Filler from "../PDF_Filler/filler";
import ScrollTop from "../reUse/scrollTop";
function Body(props){

    return(
        <div className="firstBody-sub">
            <Section1 updateNavNameP={props.updateNavNameP} id={props.id} />
            {
            props.viewP==='Filler' ? <Section2 id={props.id} searchString2={props.searchString}/> :
              <Filler  searchString2={props.searchString}/>
            }
             <ScrollTop/>

        </div>
    )
}

export default Body;
/*


HOW TO UPDATE AN EXITING REPO
* connect the remote repo with this sample


NOTE:when trying to connect to git repo and it produceed an error then run this command
{git remote add origin https://github.com/VijayNew/NewExample.git} 
after which try connecting again

git remote set-url origin https://github.com/chinaza-max/victor--project
git remote set-url origin  https://github.com/chinaza-max/competition-tic-tac-toe.git
git remote add origin https://github.com/chinaza-max/competition-tic-tac-toe.git

*git remote -v
*add changes 
git add .

git commit -am "second message"
*push 
NOTE: when you push to git repo and it refuse and use this command instead  {git push origin master --force
}
git push  origin master

sample url
git remote set-url origin https://github.com/chinaza-max/competition-tic-tac-toe.git
*/