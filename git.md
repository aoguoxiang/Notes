# 总结git命令的基本用法，主要基于《Pro Git中文版(第二版)》，同时也有github的一些用法
## 关于Git
### Git中的三种状态
- Git有committed,modifiled,staged三种状态，对应三种不同的工作区(git仓库，工作目录，暂存区域)
    - Git仓库目录是Git用来保存项目的元数据和对象数据库的地方
    - 工作目录是对项目的某个版本独立提取出来的内容，放在磁盘上供你使用和修改
    - 暂存区域是一个文件，保存了**下次将提交的文件列表信息，一般在Git仓库目录中**。 有时候也被称作`‘索引’'，不过一般说法还是叫暂存区域。
- 基本Git的工作流程如下：
    1. 在工作目录中修改文件。
    2. 暂存文件，将文件的快照放入暂存区域。
    3. 提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录。  
![git的三种工作区](https://www.progit.cn/images/areas.png)  
[windows下安装Git如何获取最新版本](https://segmentfault.com/q/1010000011704285)
### 设置用户信息
- 当安装完Git应该做的第一件事就是设置你的用户名称与邮件地址。这样做很重要，因为每一个Git的提交都会使用这些信息，并且它会写入到你的每一次提交中，不可更改：
```
$ git config --global user.name "Allen Ochs"
$ git config --global user.email 1282392205@qq.com
```
- 如果使用了 --global 选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事情，Git 都会使用那些信息。当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有 --global 选项的命令来配置。
### 检查配置信息
- 可以使用 `git config --list` 命令列出所有Git当时能找到的配置
- 你可能会看到重复的变量名，因为Git会从不同的文件中读取同一个配置（例如：/etc/gitconfig 与 ~/.gitconfig）。这种情况下，Git会使用它找到的每一个变量的最后一个配置。
- 你可以使用`git config <key>`检查某一项config配置，例如：
```
git config user.name //Allen Ochs
```
### Git中用Vim打开，修改，保存文件
1. Vim有两种工作模式，分别为命令模式和编辑模式
    - 命令模式：接受、执行vim命令操作的模式，打开文件后默认的模式
    - 编辑模式：对打开文件的内容进行增、删、改操作的模式
    - 在命令模式下按`i`进入编辑模式，在编辑模式下按`ESC`退出到命令模式
2. 创建、打开文件
    - 输入touch文件名，可创建文件夹
    - 使用vim加文件路径(或文件名)，按路径打开文件，如果文件不存在就新建文件
3. 保存文件
    - 在命令模式下键入`:wq`，回车后，保存修改并退出vim；键入`:w`，回车后，保存修改但不退出vim
4. 放弃所有文件修改
    - 在命令模式下键入`:q!`，回车后，放弃所有修改并退出vim；键入`:e!`，回车后，放弃修改但不退出vim
5. 查看文件内容
    - 在git命令窗口键入`cat <file>`
### 获取帮助
有三种方法可以找到Git命令的使用手册：
```
git help <verb>
git  <verb> --help
man git-<verb>
```
## Git基础
### 获取Git仓库
- 有两种取得 Git 项目仓库的方法。第一种是使用`git init`初始化现有目录；第二种是使用`git clone`从一个服务器克隆一个现有的Git仓库。
- Git支持多种数据传输协议，有`https://`协议，`git://`协议，SSH传输协议，例如`git@github.com:aoguoxiang/Notes.git`
### 记录每次更新到仓库
- 工作目录的文件只有"未跟踪"和"已跟踪"两种状态，而"已跟踪"文件有三种状态，参考上文"Git中的三种状态"
- 初次克隆某个仓库的时候，工作目录中的所有文件都属于已跟踪文件，并处于未修改状态(即comitted状态)。  
使用Git文件时的生命周期图：  
![使用Git文件时的生命周期图](https://www.progit.cn/images/lifecycle.png)
### git add命令
- `git add`是一个多功能命令，可以将"未跟踪文件"添加到"跟踪文件"；可以将"已修改文件"添加到"暂存区"；可以把有“合并冲突”的文件标记为已解决状态等
- `git add <file>/[url]`命令以"文件"和"目录路径"为参数，如果参数是目录的路径，该命令将递归地跟踪该目录下的所有文件
- 运行了`git add`之后又作了修改的文件(这时使用`git status`会发现同一个文件状态既为"staged"又为"modified")，需要重新运行`git add`把最新版本重新暂存起来
### git status命令
- `git status -s`或者`git status --short`可以以简略、紧凑的方式输出状态
```
git status -s
<!-- 表示该文件已修改但未放入暂存区 -->
 M README
 <!-- 表示放入暂存区的文件后面又修改了 -->
MM Rakefile
<!-- 表示新添加的跟踪文件 -->
A  lib/git.rb
<!-- 表示已修改并放入暂存区 -->
M  lib/simplegit.rb
<!-- 表示未跟踪文件 -->
?? LICENSE.txt
```
### git diff命令
- 比较的是工作目录当前文件和暂存区快照之间的差异，也就是修改后还未暂存的文件的变化内容  
**`git diff`本身只显示尚未暂存的文件的改动，有时候你一下子暂存所有更新过的文件，运行`git diff`什么也没有就是这个原因**
- 若要查看已暂存的将要添加到下一次提交的内容，可以使用`git diff --cached`
### git commit命令
- 每一次提交只会记录暂存区的记录，因此在使用`git commit`命令之前先用`git status`查看哪些文件还未添加到暂存区
- 直接使用`git commit`命令会默认打开文本编辑器(windows下一般为Vim)，以便于输入本次提交说明
- 可以使用`git commit -m "本次提交说明"`将提交说明和命令行放在同一行(推荐方式)
- 使用`git commit -a -m "xxx"`将所有已跟踪并暂存起来的文件一并提交，从而跳过使用`git add`命令
- `git commit --amend`用于重新提交，有时候想要修改提交说明或者提交后发现还有漏掉的文件，这个命令就非常有用(注意会打开Vim编辑器)
### git rm命令
- 要移除已跟踪文件，必须从已跟踪清单中删除，并且提交。如果只是简单地从工作目录中删除文件，Git会认为仅仅修改了该文件，并未从已跟踪清单中移除
- `git rm`命令不仅将文件从工作目录删除，还将移除的文件添加到暂存区，然后执行`git commit -m`命令，下一次Git就不会它纳入版本管理了

注意两种情况：  
1. 如果文件已修改并添加到暂存区，这时只能使用`git rm -f`强制性删除，这是一种安全特性，用于防止误删还没有添加到快照的数据，这样的数据不能被Git恢复。
2. 另外一种情况是，我们想把文件从Git仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中。换句话说，你想让文件保留在磁盘，但是并不想让 Git 继续跟踪。当你忘记添加 .gitignore 文件，不小心把一个很大的日志文件或一堆 .a 这样的编译生成文件添加到暂存区时，这一做法尤其有用。为达到这一目的，使用`git rm --cached <file>`
### git mv命令
```
git mv README.md README
```
上面命令将README.md改名为README，实际上相当于下面三条命令：
```
mv README.md README
git rm README.md
git add README
```
### git log命令
- `git log -p <-number>`显示每次提交的内容差异，可以在后面添加`-number`例如：`-2`表示最近两次提交。这种在快速浏览搭档commit所带来的变化非常有用
- `git log --stat`显示每次提交的简略统计信息，它会统计所有被修改过的文件、有多少文件被修改、修改的文件有多少行被移除或添加、一个提交总结
- `git log --pretty=<内建子选项>`，其中最有意思的子选项是`--format`，[--format常用选项](https://www.progit.cn/#pretty_format)
*`git log`常用选项*  
<table>
    <tr><td>选项</td><td>说明</td></tr>
    <tr><th>-p</th><th>按补丁格式显示每个更新之间的差异</th></tr>
    <tr><th>--stat</th><th>显示每次更新的文件修改统计信息</th></tr>
    <tr><th>--shortstat</th><th>显示每次更新的文件修改统计信息</th></tr>
    <tr><th>--name-only</th><th>仅在提交信息后显示已修改的文件清单</th></tr>
    <tr><th>--name-status</th><th>显示新增、修改、删除的文件清单</th></tr>
    <tr><th>--abbrev-commit</th><th>仅显示SHA-1的前几个字符，而非所有的40个字符</th></tr>
    <tr><th>--relative-date</th><th>使用较短的相对时间显示(比如，“2 weeks ago”)</th></tr>
    <tr><th>--graph</th><th>显示ASCII图形表示的分支合并历史</th></tr>
    <tr><th>--pretty</th><th>使用其他格式显示历史提交信息。可用的选项包括oneline,short,full,fuller和format(后跟指定格式)</th></tr>
</table>

*限制`git log`输出的常用选项*
<table>
    <tr><td>选项</td><td>说明</td></tr>
    <tr><th>-n</th><th>仅显示最近的n条提交</th></tr>
    <tr><th>--since</th><th>仅显示指定时间之后的提交</th></tr>
    <tr><th>--until</th><th>仅显示指定时间之前的提交</th></tr>
    <tr><th>--author</th><th>仅显示指定作者相关的提交</th></tr>
    <tr><th>--committer</th><th>仅显示指定提交者相关的提交</th></tr>
    <tr><th>--grep</th><th>仅显示含指定关键字的提交</th></tr>
    <tr><th>-S</th><th>仅显示添加或移除某个关键字的提交</th></tr>
</table>

### 回退到之前的版本
- 首先使用`git log`查看提交历史，找到要回退版本的commit-id(SHA-1值)
- 然后使用`git reset --hard <commit-id>`或者`git reset --hard HEAD^`(表示回退到上一个版本)
- 使用`git push -f <remote-name> <branch>`强制更新远程仓库
### 撤销操作
- 在Git中，已提交的东西几乎总是可以恢复，但是对未提交的东西进行撤销操作很有可能无法恢复
    > `git checkout -- <file>`表示将它还原成上次提交时的样子，这会丢失你之前做的所有修改
### 远程仓库
- 使用`git remote add <shortname> <url>`添加远程仓库
- 使用`git remote show <remote-name>`查看远程仓库
    > 这个命令会显示目前你所在的分支，有哪些远程分支以及对应的状态，使用`git pull`哪些分支会自动合并，使用`git push`会自动推送到那个远程分支
- `git remote rename [old-remote-name] [new-remote-name]`可以重命名一个远程仓库名
    > 值得注意的是这同样也会修改你的远程分支名字。那些过去引用 pb/master 的现在会引用 paul/master。
- `git remote rm [remote-name]`会移除一个远程仓库
### 打标签
- `git tag`会列出所有的标签，标签是按字母顺序列出，但是顺序并不重要
- 可以使用特定模式查找标签，例如你只对Git源代码仓库的"v1.8.5"感兴趣，使用`git tag -l "v1.8.5*"`
- 轻量标签(lightweight)只是特定提交的一个引用，附注标签(annotated)是存储在Git数据库的一个完整对象，它包含打标签者的名字，创建日期，电子邮件，标签信息等，通常推荐打附注标签，如果只是想临时创建一个标签，也可以使用轻量标签
    - 标签跟某个特定的commit挂钩，如果某个commit同时在多个分支上，那么所有分支上都能看到该标签
    - `git tag -a v1.0 -m "my version v1.0"`创建一个附注标签，如果省略`-m`选项会默认打开编辑器，要求输入标签信息
    - 轻量标签本质上是将提交校验和存储到一个文件中，没有保存任何其他信息。创建轻量标签，不需要使用 -a、-s 或 -m 选项，只需要提供标签名字：
        > `git tag v1.1`
    - 使用`git show <tag-name>`可以显示标签信息
    - 使用`git tag -d <tag-name>`可以删除标签，但是删除远程标签就比较麻烦
- 使用`git tag -a <tag-name> <commit-id> -m "标签说明"`可以在后期对特定提交打标签
- 默认情况下，`git push`不会传送标签到远程服务器上；使用`git push [remote-name] [tag-name]`显式地将标签传送到远程仓库；使用`git push [remote-name] --tag`可以将远程仓库没有的标签一次性全部推送上去
## Git分支
- Git保存的是文件的快照而不是文件的差异
- 首次提交产生的提交对象没有父对象，普通提交产生的提交对象有一个父对象，而由多个分支合并产生的提交对象有多个父对象
- 暂存操作会为**每个文件**计算校验和(SHA-1哈希算法)，然后把当前版本的文件快照保存到Git仓库中(Git使用blob对象来保存它们)
- 使用`git commit`进行提交操作时，Git会计算每一个子目录(没有子目录就是项目根目录)的校验和，然后在Git仓库中这些校验和保存为**树对象**。随后，Git 便会创建一个提交对象，它除了包含上面提到的那些信息外，还包含指向这个树对象（项目根目录）的指针。  
示例：假设现在有一个工作目录，里面包含了三个将要被暂存和提交的文件  
*首次提交产生的提交对象*
![首次产生的提交对象](https://www.progit.cn/images/commit-and-tree.png)
*普通提交产生的提交对象以及父对象*
![普通提交产生的提交对象以及父对象](https://www.progit.cn/images/commits-and-parents.png)
### 创建分支
- Git的分支，其实**本质上仅仅是指向提交对象的可变指针**。Git的默认分支名字是master。在多次提交操作之后，你其实已经有一个指向最后那个提交对象的master分支。它会在每次的提交操作中自动向前移动。
    > Git的“master”分支并不是一个特殊分支。它就跟其它分支完全没有区别。之所以几乎每一个仓库都有 master 分支，是因为git init命令默认创建它，并且大多数人都懒得去改动它。
- 使用`git branch <branch-name>`创建一个新分支，但是并不会自动切换到新分支上；在Git中，*HEAD指针*指向*目前所在本地分支*，*分支*指向*提交对象*，*提交对象*指向*快照*
- 可以使用`git log --oneline --decorate`查看各个分支当前所指的对象
- 使用`git checkout <branch-name>`切换分支；`git checkout -b <branch-name>`新建一个分支并且切换到新分支上；`git branch -d <branch-name>`删除分支(如果分支未合并，在删除时Git会有一个警告，使用`-D`强制性删除)
    > 在切换分支时，一定要注意你工作目录里的文件会被改变。如果是切换到一个较旧的分支，你的工作目录会恢复到该分支最后一次提交时的样子。如果Git不能干净利落地完成这个任务，它将禁止切换分支。
### 分支合并
> 合并分支时，指针只能向前推进
`fast-forward`合并模式：  
- `git merge`用于分支合并，在合并两个分支中，如果顺着一个分支走下去能够到达另一个分支，那么Git在合并两者的时候，只会简单的将指针向前推进（指针右移），因为这种情况下的合并操作没有需要解决的分歧——这就叫做 “快进（fast-forward）”。
典型合并：  
- 典型合并中会用到**三个快照**，分别是两个分支的末端快照和它们的共同祖先，值得注意的是这种*典型合并可能会产生合并冲突*
    > Git中会自行决定选取哪一个提交作为最优的共同祖先，相比其他VCS需要手动选择最佳的合并基础，使用要简单得多
*一次典型合并用到的三个快照*
![典型合并用到的三个快照](https://www.progit.cn/images/basic-merging-1.png)  
遇到冲突时的分支合并：  
- **在两个不同分支中对同一个文件的同一部分进行了不同的修改**，就会遇到合并冲突(因为Git无法确定用户是需要哪个分支的修改)，需要用户手动解决
- 在遇到冲突时的分支合并，Git其实做了合并，但是没有自动地创建一个新的合并提交。Git会暂停下来，等待你去解决合并产生的冲突
- 在解决冲突后，需要用`git add <file>`命令将其标记为冲突已解决，并添加都了暂存区，但是用`git status`查看依然在merging，需要`git commit`命令完成合并提交
### 分支管理
- `git branch -v`查看每个分支的最后一次提交
- `git branch --merged`过滤出分支列表中已经合并到当前分支的分支
- `git branch --no-merged`过滤出分支列表中未合并到当前分支的分支
### 分支开发工作流
长期分支：  
- 通常用在大型项目中，这种方法**可以维护不同层次的稳定性**。目的是使你的分支具有不同级别的稳定性；当它们具有一定程度的稳定性后，再把它们合并入具有更高级别稳定性的分支中  
*渐进稳定分支的流水线视图*
![渐进稳定分支的流水线视图](https://www.progit.cn/images/lr-branches-2.png)
特性分支：  
- 特性分支是一种短期分支，用来实现单一特性或其相关工作，它适合任何规模的项目  
[Pro Git分支开发工作流的特性分支](https://www.progit.cn/#_%E5%88%86%E6%94%AF%E5%BC%80%E5%8F%91%E5%B7%A5%E4%BD%9C%E6%B5%81)
### 远程分支
- *远程引用*是对*远程仓库*的引用(指针)，包含分支，标签等等。可以使用`git remote show <remote-name>`获取更多远程仓库的信息
- *远程跟踪分支*是对*远程分支状态的引用*。它们是你不能移动的*本地引用*(见下面示例)，当你做任何网络通信操作时，它们会自动移动。远程跟踪分支像是你最后一次连接到远程仓库时，那些分支所处状态的书签
    > 远程跟踪分支以`(remote)/(branch)`命名
```
<!-- 切换到origin/master分支，origin/master分支指向ca82a -->
$ git checkout origin/master
$ git log --oneline --graph --decorate
* ca82a6d (HEAD, origin/master, origin/HEAD) changed the verison number
* 085bb3b removed unnecessary test code
* a11bef0 first commit
<!-- 这时回退到上一个版本，你会发现origin/master并没有移动，这点与在本地分支执行回退操作有很大的区别 -->
git reset --hard 085bb
git log --oneline --graph --decorate
* 085bb3b(HEAD) removed unnecessary test code
* a11bef0 first commit
```
- `git clone -o <remote-name>`会替换掉Git系统默认远程引用"origin"

推送本地分支到远程仓库：  
- `git push <remote> <branch>`将本地分支推送到远程分支，远程仓库分支名默认与本地分支相同
    > 相当于`git push <remote> <branch>:<branch>`
    > 因此可以使用`git push <remote> <branch>:<new-branch>`更改默认的远程分支名

拉取远程分支： 
**假设远程仓库有一个本地仓库没有的dev分支** 
- `git fetch <remote-name>`会从远程仓库抓取你本地仓库没有的数据，从而达到同步作用
    > 要特别注意的一点是当抓取到新的远程跟踪分支时，本地不会自动生成一份可编辑的副本（拷贝）。换一句话说，这种情况下，不会有一个新的dev分支 ,只有一个不可以修改的origin/dev指针。
- 运行`git merge origin/dev`将这些分支合并到**当前所在分支**
    >`git checkout -b dev origin/dev`会在本地仓库建立一个dev分支，其建立在远程跟踪分支上(origin/dev)，并且起点为origin/dev
- `git pull`命令在大多数情况下，它的含义是一个`git fetch`命令后紧跟着`git merge`命令，通常推荐单独使用`git fetch`命令

跟踪分支：  
- 跟踪分支是从一个远程跟踪分支**检出一个本地分支**时自动创建的，它与远程分支有直接的关系
    > 上文使用到的`git checkout -b dev origin/dev`中的dev就是一个跟踪分支
    > 跟踪分支与本地分支的区别在于跟踪分支与远程分支有直接关系，而本地分支则没有(但是可以设置为跟踪分支)
- 在克隆一个仓库时，会自动创建跟踪origin/master的master跟踪分支
- 设置已有的本地分支跟踪一个刚刚拉取下来的远程分支，或者想要修改正在跟踪的上游分支，你可以在任意时间使用 -u 或 --set-upstream-to 选项运行git branch 来显式地设置。
    > 当设置好跟踪分支后，可以通过 @{upstream} 或 @{u} 快捷方式来引用它。所以在 master 分支时并且它正在跟踪 origin/master 时，如果愿意的话可以使用 git merge @{u} 来取代 git merge origin/master
- 如果想要查看设置的所有跟踪分支，可以使用`git branch`的`-vv`选项。 这会将所有的本地分支列出来并且包含更多的信息，如每一个分支正在跟踪哪个远程分支与本地分支是否是领先、落后或是都有。 见下面示例：
```
git branch -vv
  iss53     7e424c3 [origin/iss53: ahead 2] forgot the brackets
  master    1ae2a45 [origin/master] deploying index fix
* serverfix f8674d9 [teamone/server-fix-good: ahead 3, behind 1] this should do it
  testing   5ea463a trying something new
```
上面命令显示出iss53 分支正在跟踪 origin/iss53 并且 “ahead” 是 2，意味着本地有两个提交还没有推送到服务器上。也能看到 master 分支正在跟踪 origin/master 分支并且是最新的。 接下来可以看到 serverfix 分支正在跟踪 teamone 服务器上的 server-fix-good 分支并且领先 3落后 1，意味着服务器上有一次提交还没有合并入同时本地有三次提交还没有推送。 最后看到 testing 分支并没有跟踪任何远程分支。
    > 需要重点注意的一点是这些数字的值来自于你从每个服务器上最后一次抓取的数据。 这个命令并没有连接服务器，它只会告诉你关于本地缓存的服务器数据。如果想要统计最新的领先与落后数字，需要在运行此命令前抓取所有的远程仓库。 可以像这样做：`git fetch --all; git branch -vv`

删除远程分支：  
- 使用`git push <remote> --delete <branch-name>`删除远程分支，注意这里的`<branch-name>`是指远程仓库的分支
    > 基本上这个命令做的只是从服务器上移除这个指针。Git 服务器通常会保留数据一段时间直到垃圾回收运行，所以如果不小心删除掉了，通常是很容易恢复的

变基：  
*通过合并整合分叉历史的提交*
![通过合并整合分叉历史的提交](https://www.progit.cn/images/basic-rebase-2.png)
*变基的过程——将C4的修改变基到C3上*
![变基的过程——将C4的修改变基到C3上](https://www.progit.cn/images/basic-rebase-3.png)
    > 注意C4'是相对于C2(于master分支的共同祖先)的补丁+C3
上面"变基的过程"的原理是**首先找到这两个分支（即当前分支 experiment、变基操作的目标基底分支 master）的最近共同祖先C2，然后对比当前分支相对于该祖先的历次提交，提取相应的修改并存为临时文件，然后将当前分支指向目标基底 C3, 最后以此将之前另存为临时文件的修改依序应用。**最后通过`git checkout master;git merge experiment`进行一次`fast-forward`提交

变基和合并的区别：  
- 变基和合并这两种整合方法最终的提交结果是一模一样的，只不过提交历史不同。变基是将一系列提交快照按照原有次序依次应用到另一分支上，而合并是把最终结果合在一起
- 变基的实质是丢弃一些现有的提交，然后新建一些内容一样但实际上不同的提交

优点：  
- 变基使得提交历史更为整洁。你在查看一个经过变基的分支的历史记录时会发现，尽管实际的开发工作是并行的，但它们看上去就像是串行的一样，提交历史是一条直线没有分叉
缺点：  
使用变基操作的一条准则是**不要对在你的仓库外有副本的分支执行变基。**，详情参见[变基的风险](https://www.progit.cn/#_remote_branches)

更多有趣的变基例子：  
*从一个特性分支再分出一个特性分支*
![从一个特性分支再分出一个特性分支](https://www.progit.cn/images/interesting-rebase-1.png)
如果这时只是想将client分支合并到master分支上，暂时不合并server分支，可以使用`git rebase --onto master server client`  
上面git命令表示“取出 client 分支，找出处于 client 分支和 server 分支的共同祖先(即C3)之后的修改，然后把它们在 master 分支上重放一遍”，最终就变成如下图所示：
*从特性分支上截取特性分支合并到另一个分支上*
![从特性分支上截取特性分支合并到另一个分支上](https://www.progit.cn/images/interesting-rebase-2.png)

变基VS合并：  
对于是使用“变基”还是“合并”并没有标准答案，回答这个问题可以了解人们对于提交历史的两种看法：  
1. 一种观点认为，仓库的提交历史记录着**实际发生了什么**。它是针对历史的文档，本身就有价值，不能乱改。 从这个角度看来，改变提交历史是一种亵渎，你使用_谎言_掩盖了实际发生过的事情。 如果由合并产生的提交历史是一团糟怎么办？ 既然事实就是如此，那么这些痕迹就应该被保留下来，让后人能够查阅。  
2. 另一种观点则正好相反，他们认为提交历史是**项目过程中发生的事**。 没人会出版一本书的第一版草稿，软件维护手册也是需要反复修订才能方便使用。 持这一观点的人会使用 rebase 及 filter-branch 等工具来编写故事，怎么方便后来的读者就怎么写。
> 总的原则是，只对**尚未推送或分享给别人的本地修改执行变基操作清理历史，从不对已推送至别处的提交执行变基操作**这样，你才能享受到两种方式带来的便利
### 总结
本地分支：  
- 使用`git branch <branch-name>`创建一个分支；`git checkout <branch-name>`切换一个分支；`git checkout -b <branch-name>`创建一个分支并且自动切换到新创建的分支
- 本地分支合并有`fast-forward`和"典型合并"两种方式
    - `fast-forward`合并最简单，只需简单的向前移动指针，不会存在"合并冲突"问题
    - "典型合并"会自动用到三个快照进行合并，新提交的合并会有两各"父提交"，如果遇到**两个分支在同一个文件的同一部分进行修改**就会遇到"合并冲突"
        > 遇到合并冲突时，Git已经合并，但是需要用户自己手动解决，并且使用`git add <file>`添加到暂存区——标记冲突已解决，再使用`git commit`提交一个新的合并提交

远程分支：  
- 首先要理解“远程分支”，“远程跟踪分支”，“跟踪分支”(也称“上游分支”)的概率与区别
    - “远程分支”就是在远程仓库上的普通分支。“远程跟踪分支”是在本地的**只读**的记录远程分支状态的分支，其指向用户无法移动，当使用git fetch等指令时其指向会依照远程仓库自动移动。“”跟踪分支“”是从远程跟踪分支上生成的**本地分支**，跟踪分支提供了本地分支与远程分支更紧密的联系，可以看出本地分支与对应的远程分支的超前落后情况，也可以使用git pull 指令轻松的将远程分支拉取到对应的跟踪分支
    - 想要“本地分支”与“远程分支”通信，必须要创建“远程跟踪分支”(通常通过`git fetch`命令创建)
    - 通过`git branch -vv`可以查看所有分支列表，它会列出那些分支是跟踪分支并且与远程分支超前落户的情况
    - 通过`git checkout -b [remote-name]/[branch]`从远程跟踪分支上生成本地分支，并且自动设置为跟踪分支；如果已经有本地分支，可以通过`git branch -u [remote-name]/[branch]`设置为跟踪分支
    - 设置好跟踪分支后，可以使用`git merge @{u}`这种快捷方式合并远程分支，而本地分支则只能使用`git merge [remote-name]/[branch]`来合并远程分支
## github上的"New pull request"作用有哪些？
在github上个人的repository分为两种，一种是自己创建的，另一种是fork别人的；
- 自己创建的repository在发布后，别人如果fork你的仓库，并且别人有了新的commited，你觉得ok可以Merge，那么需要如下操作：
    1. 进入仓库页面，选择Code选项，找到New pull request按钮点击进入；
    2. 在新打开的页面里base fork选择自己的仓库和分支，head fork选择你想要Merge的用户的仓库和分支
    3. 点击Create pull request，添加创建说明，再点击Merge pull request就成功将别人的commited合并到自己的分支中了
- fork别人的repository想要保持和原作者同步更新，那么需要如下操作：
    1. 进入仓库页面，选择Code选项，找到New pull request按钮点击进入；
    2. 此时应该点击一compare across fork,再将base fork选择自己的仓库和分支，head fork选择源作者的仓库和分支
    3. 点击Create pull request，添加创建说明，再点击Merge pull request就成功将别人的commited合并到自己的分支中了
[保持同源代码同步的git命令操作](https://www.cnblogs.com/rxbook/p/7090208.html)
- fork别人的repository想要向源作者推送commited，那么需要如下操作：
    1. 同上面的步骤类似，只是要将base fork选择源作者的仓库和分支,head fork选择自己的仓库和分支  
[github上的PR操作](https://www.cnblogs.com/momo798/p/11599679.html)